-- Créer un enum pour les rôles d'utilisateur
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Créer la table des rôles utilisateur
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- Activer RLS sur la table user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Créer une fonction sécurisée pour vérifier les rôles (évite la récursion RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Supprimer l'ancienne politique problématique
DROP POLICY IF EXISTS "Admin can view all registrations" ON public.registrations;

-- Créer une nouvelle politique sécurisée pour les inscriptions
-- Seuls les admins authentifiés peuvent voir les inscriptions
CREATE POLICY "Only admins can view registrations" 
ON public.registrations 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Politique pour permettre aux admins de modifier les inscriptions si nécessaire
CREATE POLICY "Only admins can update registrations" 
ON public.registrations 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Garder la politique d'insertion publique pour le formulaire de contact
-- (elle existait déjà et fonctionne correctement)

-- Politique pour permettre aux admins de supprimer des inscriptions si nécessaire
CREATE POLICY "Only admins can delete registrations" 
ON public.registrations 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Politique pour les rôles utilisateur - seuls les admins peuvent voir/gérer les rôles
CREATE POLICY "Only admins can view user roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert user roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update user roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete user roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));