import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function StoreUnavailable() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Store Currently Unavailable
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-gray-600">
          This is a community-made project and is not directly affiliated with
          or sanctioned by ExhibitionRP.
        </p>
        <p className="text-center text-gray-600">
          For security reasons, the store functionality will not be implemented.
        </p>
        <div className="flex justify-center pt-4">
          <Link
            href="https://hub.exhibitionrp.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Proceed to Official Store</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
