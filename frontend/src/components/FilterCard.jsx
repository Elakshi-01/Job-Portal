import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "UI/UX Developer",
      "Full Stack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1Lakh", "1Lakh to 5 Lakh"],
  },
];

const FilterCard = () => {
  return (
 <div className="w-72 bg-white rounded-md p-5 h-fit self-start">

      <h1 className="font-semibold text-lg text-black">
        Filter Jobs
      </h1>

      <hr className="my-4 border-black" />

      <RadioGroup.Root className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-medium    text-bold      text-black mb-3">
              {data.filterType}
            </h2>

            <div className="space-y-2">
              {data.array.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <RadioGroup.Item
                    value={item}
                    className="h-4 w-4 rounded-full border border-black flex items-center justify-center"
                  >
                    <RadioGroup.Indicator className="h-2 w-2 rounded-full bg-black" />
                  </RadioGroup.Item>

                  <Label className="text-sm text-black cursor-pointer">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default FilterCard;
