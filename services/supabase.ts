// import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@env';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);