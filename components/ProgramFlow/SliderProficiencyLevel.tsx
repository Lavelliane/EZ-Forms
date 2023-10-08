import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from '@/components/ui/card';

export type { ProficiencyLevel };

export const proficiencyLevels: ProficiencyLevel[] = [
  {
    value: 1,
    label: "Beginner",
  },
  {
    value: 2,
    label: "Novice",
  },
  {
    value: 3,
    label: "Intermediate",
  },
  {
    value: 4,
    label: "Advanced",
  },
  {
    value: 5,
    label: "Expert",
  },
];

interface ProficiencyLevel {
  value: number;
  label: string;
}

interface SliderProficiencyLevelProps {
  proficiencyLevels: ProficiencyLevel[];
  onProficiencyChange: (level: number) => void;
}

export function SliderProficiencyLevel({
  proficiencyLevels,
  onProficiencyChange,
}: SliderProficiencyLevelProps) {
  const [selectedLevelInternal, setSelectedLevelInternal] = useState<number>(3);

  useEffect(() => {
    // Update the parent component's state with the selected proficiency level
    onProficiencyChange(selectedLevelInternal);
  }, [selectedLevelInternal, onProficiencyChange]);

  const handleSliderChange = (value: number[]) => {
    setSelectedLevelInternal(value[0]);
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="flex flex-col w-full h-10 justify-center mb-2 px-12">
        <Slider
          max={5}
          min={1}
          step={1}
          value={[selectedLevelInternal]}
          onValueChange={handleSliderChange}
        />
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <Card className="hover:shadow-md transition-shadow w-full">
          <CardContent className="flex flex-col gap-2 items-center mt-6">
            <Label htmlFor="proficiencyLevel" className="font-bold text-lg">
              <span className="bg-gradient-to-r text-transparent from-purple-500 to-blue-500 bg-clip-text">
                {proficiencyLevels[selectedLevelInternal - 1].label}
              </span>
            </Label>
            <Image
              src={require(`../../public/assets/wiz-${proficiencyLevels[selectedLevelInternal - 1].label.toLowerCase()}.svg`)}
              width={245}
              height={500}
              alt="Where did the wizard go?"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default SliderProficiencyLevel