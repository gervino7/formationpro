-- Fix security linter warning: Set search_path for validate_registration function
CREATE OR REPLACE FUNCTION public.validate_registration()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate phone format (basic check for digits and common formats)
  IF NEW.phone !~ '^[\+]?[0-9\s\-\(\)]{8,20}$' THEN
    RAISE EXCEPTION 'Invalid phone format';
  END IF;
  
  -- Validate name length (must be reasonable)
  IF LENGTH(TRIM(NEW.name)) < 2 OR LENGTH(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  -- Validate message length if provided
  IF NEW.message IS NOT NULL AND LENGTH(NEW.message) > 1000 THEN
    RAISE EXCEPTION 'Message must be less than 1000 characters';
  END IF;
  
  -- Trim whitespace
  NEW.name := TRIM(NEW.name);
  NEW.email := LOWER(TRIM(NEW.email));
  NEW.phone := TRIM(NEW.phone);
  IF NEW.message IS NOT NULL THEN
    NEW.message := TRIM(NEW.message);
  END IF;
  
  RETURN NEW;
END;
$$;