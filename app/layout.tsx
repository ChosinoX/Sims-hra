import'./style.css';import type{Metadata}from'next';
export const metadata:Metadata={title:'LumaLife',description:'Build a bright little life.',manifest:'/manifest.json',icons:'/icon.svg'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="cs"><body>{children}</body></html>}
