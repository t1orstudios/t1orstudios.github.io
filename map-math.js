export const WIDTH=2400,HEIGHT=1500;
export function clampView(v){const width=Math.max(WIDTH/5,Math.min(WIDTH,v.width));const height=width*HEIGHT/WIDTH;return {x:Math.max(0,Math.min(WIDTH-width,v.x)),y:Math.max(0,Math.min(HEIGHT-height,v.y)),width,height}}
export function zoomAt(v,factor,x,y){const width=Math.max(WIDTH/5,Math.min(WIDTH,v.width/factor));const ratio=width/v.width;return clampView({x:x-(x-v.x)*ratio,y:y-(y-v.y)*ratio,width})}
export function panBy(v,dx,dy){return clampView({...v,x:v.x+dx,y:v.y+dy})}
