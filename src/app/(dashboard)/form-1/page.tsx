"use client";

import { useMutation } from "@tanstack/react-query";
import Header from "../../../../components/ActivityFormOne/Header";
import getFormOneFields from "@/mutations/getFormOneFields";
import { useEffect, useState } from "react";

function FormOnePage() {
  const [data, setData] = useState<any>();
  const { mutate: generateFormOne } = useMutation({
    mutationFn: getFormOneFields,
    onSuccess: (data) => {
      setData(data)
    }
  });
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="flex justify-center items-center ">
      <button onClick={async () => {
         await generateFormOne({
           eventName: "AWS Jupyter Notebooks",
           orgName: "Computer Driven Enthusiasts",
           outputType: "description",
         })
      }}>Generate</button>
      <Header />
    </div>
  );
}
export default FormOnePage;
