import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://trvprttbvnmvftqshgip.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRydnBydHRidm5tdmZ0cXNoZ2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUyMDIyMTcsImV4cCI6MjAxMDc3ODIxN30.Xugy1dPo_VK-t1XbKyQfNgd7mQQcox32MDFUQktSVFo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
