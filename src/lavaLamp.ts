export const lavaLamp =
    "#define G vec3(iResolution.xy,iTime)\n" +
    "void mainImage(out vec4 l,vec2 o){l-=l;\n" +
    "  for(float b=-1.;b<1.;b+=21e-3){\n" +
    "    vec2 e=cos(b*64.+G.z+vec2(0,11))*sqrt(1.-b*b);\n" +
    "    l+=(cos(b+vec4(9,2,3,2))+1.)*(1.-e.y)/\n" +
    "    dot(e=(o+o-G.xy)/G.y+vec2(e.x,b)/(e.y+2.),e)/3e3;}}"