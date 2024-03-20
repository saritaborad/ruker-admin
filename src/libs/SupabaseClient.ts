import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.REACT_APP_SUPABASE_COMBINED_KEY?.split(",")[0];
const supabaseKey = process.env.REACT_APP_SUPABASE_COMBINED_KEY?.split(",")[1];

const supabase = createClient(`${supabaseUrl}`,`${supabaseKey}`);

export default supabase;
