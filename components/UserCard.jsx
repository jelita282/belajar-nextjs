"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import custom hook dari FavoriteContext
import { useFavorite } from "@/context/FavoriteContext";

export default function UserCard({ user }) {
  const { toggleFavorite, isFavorite } = useFavorite();
  const favorited = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group border border-emerald-100 bg-white transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold">
            {initials}
          </div>
          <CardTitle className="text-emerald-950">{user.name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-emerald-900/70">{user.email}</p>

        <p className="mt-1 text-sm text-emerald-900/70">
          {user.company.name}
        </p>

        {/* 📍 PERBAIKAN: Dibungkus dengan flex agar sejajar */}
        <div className="mt-6 flex w-full items-center gap-2">
          {/* flex-1 membuat tombol ini mengisi sisa ruang yang ada */}
          <Link href={`/users/${user.id}`} className="flex-1">
           <Button className="w-full rounded-full">View Profile</Button>
          </Link>
          
          {/* shrink-0 memastikan tombol favorite ukurannya pas dengan teks/icon */}
          <Button
            variant={favorited ? "default" : "outline"}
            onClick={() => toggleFavorite(user)}
            className="shrink-0 rounded-full flex items-center justify-center gap-2"
          >
            <Heart className={`size-4 ${favorited ? "fill-current" : ""}`} />
            {favorited ? "Favourite" : "Add Favourite"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}