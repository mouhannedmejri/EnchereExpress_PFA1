
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Timer } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const formSchema = z.object({
  amount: z.number().min(1, "Le montant doit être supérieur à 0"),
});

interface BiddingZoneProps {
  id?: string;
}

const BiddingZone = ({ id }: BiddingZoneProps) => {
  // Simulation de données d'enchères
  const [currentBid, setCurrentBid] = useState(115000);
  const mockItem = {
    title: "Porsche 911 Carrera S 2021",
    description: "Une voiture de sport emblématique en excellent état. Kilométrage bas, entretien régulier, performances exceptionnelles.",
    timeLeft: "2j 15h",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=870&q=80",
    ],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.amount > currentBid) {
      setCurrentBid(values.amount);
      toast.success("Votre offre a été acceptée !");
    } else {
      toast.error("Votre offre doit être supérieure à l'offre actuelle");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {mockItem.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square relative">
                  <img
                    src={image}
                    alt={`${mockItem.title} - Image ${index + 1}`}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{mockItem.title}</CardTitle>
            <CardDescription>
              {mockItem.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-600">
                <Timer className="h-5 w-5" />
                <span className="font-medium">{mockItem.timeLeft}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Enchère actuelle</p>
                <p className="text-2xl font-bold">{currentBid.toLocaleString()} dt</p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre offre</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Montant en euros"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Enchérir
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BiddingZone;
