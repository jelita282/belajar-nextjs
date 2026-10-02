const tentangSaya =
    { name: "Jelita Ekaseptiani Narentar", role: "peserta bootcamp", favoriteTech: ["Next.js","Route"]};

export async function GET(){
    return Response.json(tentangSaya);
}