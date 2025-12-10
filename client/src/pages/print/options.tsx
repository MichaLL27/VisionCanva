import { Layout } from "@/components/Layout";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const SIZES = [
  { id: "a4", name: "A4 Poster", dimensions: "21 x 29.7 cm", description: "Small & simple", price: 19, type: "paper" },
  { id: "a3", name: "A3 Poster", dimensions: "29.7 x 42 cm", description: "Most popular", price: 29, recommended: true, type: "paper" },
  { id: "a2", name: "A2 Poster", dimensions: "42 x 59.4 cm", description: "Big poster", price: 39, type: "paper" },
  { id: "a1", name: "A1 Poster", dimensions: "59.4 x 84.1 cm", description: "Statement wall", price: 49, type: "paper" },
  { id: "canvas-m", name: "Medium Canvas", dimensions: "40 x 60 cm", description: "Framed-style", price: 59, type: "canvas" },
  { id: "canvas-l", name: "Large Canvas", dimensions: "60 x 90 cm", description: "Premium quality", price: 89, type: "canvas" },
];

export default function PrintOptions() {
  const [selectedSize, setSelectedSize] = useState("a3");
  const [_, setLocation] = useLocation();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <Link href="/result">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to vision board
          </span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Choose your print size</h1>
          <p className="text-muted-foreground text-lg">Select how big you want your vision board on the wall.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SIZES.map((size) => (
            <div 
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              className={`
                relative p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg
                ${selectedSize === size.id 
                  ? 'border-primary bg-primary/5 shadow-md scale-[1.02]' 
                  : 'border-border bg-white hover:border-primary/30'}
              `}
            >
              {size.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{size.name}</h3>
                  <p className="text-sm text-muted-foreground">{size.dimensions}</p>
                </div>
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedSize === size.id ? 'border-primary bg-primary text-white' : 'border-muted-foreground/30'}
                `}>
                  {selectedSize === size.id && <Check className="w-3 h-3" />}
                </div>
              </div>

              <div className="space-y-4">
                <div className="aspect-[3/4] bg-muted/20 rounded-lg flex items-center justify-center border border-dashed border-muted-foreground/20">
                  <span className="text-xs text-muted-foreground">Preview</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <p className="text-sm text-muted-foreground">{size.description}</p>
                  <p className="font-bold text-xl">${size.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/print/shipping">
            <button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
              Continue to Details <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
