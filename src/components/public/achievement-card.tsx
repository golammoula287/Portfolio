"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AchievementCardProps = {
  title: string;
  issuer: string;
  description: string;
  date: Date | string;
  url?: string | null;
  image?: { url: string } | null;
};

export function AchievementCard({ title, issuer, description, date, url, image }: AchievementCardProps) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long" });

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }} className="h-full">
      <Card className="h-full transition-colors hover:ring-primary/50">
        {image?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.url} alt="" className="aspect-video w-full object-cover" />
        )}
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {issuer} · {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        {url && (
          <CardFooter className="bg-transparent p-0 px-(--card-spacing) pt-2">
            <Button variant="outline" size="sm" render={<a href={url} target="_blank" rel="noreferrer" />}>
              <ExternalLink /> View
            </Button>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
