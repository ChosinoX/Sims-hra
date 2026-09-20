import {SignJWT,jwtVerify} from 'jose'; import {cookies} from 'next/headers'; import {db} from './db';
const secret=()=>new TextEncoder().encode(process.env.SESSION_SECRET||'development-only-change-this-secret');
export async function session(userId:string,remember=false){return new SignJWT({userId}).setProtectedHeader({alg:'HS256'}).setExpirationTime(remember?'30d':'1d').sign(secret())}
export async function currentUser(){const token=cookies().get('luma_session')?.value;if(!token)return null;try{const {payload}=await jwtVerify(token,secret());return db.user.findUnique({where:{id:String(payload.userId)}})}catch{return null}}
export async function requireUser(){const u=await currentUser();if(!u||u.blocked)throw new Error('UNAUTHORIZED');return u}
export async function requireAdmin(){const u=await requireUser();if(u.role!=='ADMIN')throw new Error('FORBIDDEN');return u}
