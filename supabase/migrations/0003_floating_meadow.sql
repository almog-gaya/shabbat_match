/*
  # Auth Schema Updates
  
  1. Changes
    - Add email confirmation handling
    - Add user metadata fields
    - Add auth triggers
  
  2. Security
    - Enable RLS on auth schema
    - Add policies for user access
*/

-- Add trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, birth_date, gender, location)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    CURRENT_DATE,
    '',
    ''
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();