/* eslint-disable prettier/prettier */

type CustomEnvVar =
  | 'NEXT_PUBLIC_SUPABASE_KEY'
  | 'NEXT_PUBLIC_SUPABASE_URL'

type ProcessEnvExtended = {
  [key in CustomEnvVar]: string
}

declare namespace NodeJS {
  export interface ProcessEnv extends ProcessEnvExtended {}
}
