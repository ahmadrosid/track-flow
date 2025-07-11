"use client";

import { ReciptTable } from "@/components/recipt-table";
import { UploadRecipt } from "@/components/upload-recipt";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any[]>([]);

  return (
    <div className="p-4 bg-accent/50 h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="font-elegant text-4xl font-normal md:text-5xl">trackflow</h1>
          <p className="text-muted-foreground tracking-tight italic">Turn receipt headaches into organized data with one click!</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-dashed rounded-lg space-y-4 bg-white">
            <h4 className="font-semibold tracking-tighter">Upload your receipt</h4>
            <UploadRecipt onFinishExtract={(result) => setResult(prev => [...prev, result])} />
          </div>
          <div className="p-4 border border-dashed bg-white rounded-lg space-y-4">
            <h4 className="font-semibold tracking-tighter">Result</h4>
            {result && (
              <pre className="font-mono p-4 text-sm rounded-lg bg-muted overflow-x-auto whitespace-pre-wrap break-words max-w-full max-h-70 overflow-y-auto">
                {JSON.stringify(result[0], null, 2)}
              </pre>
            )}
          </div>
        </div>
        {result && <ReciptTable jsonData={result} />}
      </div>
    </div>
  );
}
