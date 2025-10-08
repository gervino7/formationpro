-- Security Enhancement: Add rate limiting and input validation to registrations table

-- Function to check registration rate limit (prevents spam)
CREATE OR REPLACE FUNCTION public.check_registration_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if same email registered in last hour
  IF EXISTS (
    SELECT 1 FROM public.registrations
    WHERE email = NEW.email
    AND created_at > NOW() - INTERVAL '1 hour'
  ) THEN
    RAISE EXCEPTION 'Registration rate limit exceeded. Please wait before registering again.';
  END IF;
  
  -- Check if same phone registered in last hour
  IF EXISTS (
    SELECT 1 FROM public.registrations
    WHERE phone = NEW.phone
    AND created_at > NOW() - INTERVAL '1 hour'
  ) THEN
    RAISE EXCEPTION 'Registration rate limit exceeded. Please wait before registering again.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Function to validate registration data
CREATE OR REPLACE FUNCTION public.validate_registration()
RETURNS TRIGGER
LANGUAGE plpgsql
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

-- Create triggers for validation and rate limiting
CREATE TRIGGER validate_registration_trigger
  BEFORE INSERT ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_registration();

CREATE TRIGGER check_rate_limit_trigger
  BEFORE INSERT ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.check_registration_rate_limit();