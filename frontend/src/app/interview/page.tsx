"use client";

import interviewService from "@/services/transaction";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [interviews, setInterviews] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  const handleClickFetchMore = () => {
    setOffset((offset + 1) * limit);
  };

  async function fetchInterviews() {
    try {
      const response = await interviewService.getManyInterview({
        offset,
        limit,
      });
      setInterviews([...interviews, ...response]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    if (offset) fetchInterviews();
  }, [offset]);

  return (
    <main className="flex flex-col gap-6 items-center justify-between p-24">
      {interviews &&
        interviews.map((each: any, idx: number) => (
          <div
            className="w-full p-4 rounded-md border border-black bg-slate-400"
            key={idx}
          >
            <Link href={`/interview/${each?._id}`}>
              <h4 className="text-xl font-semibold mb-4">{each?.title}</h4>
            </Link>
            <p className="mb-4">{each?.description}</p>
            <div className="flex mt-4">
              <div className="flex-shrink-0 pr-2">
                <div>status</div>
              </div>
              <div className="flex-grow">{each?.status}</div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex-shrink-0 pr-2">
                <div className="flex">
                  <div className="flex-shrink-0 pr-2">{"สร้างโดย"}</div>
                  <div className="flex-1 pl-2">{each?.createdBy || "-"}</div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="flex flex-item">
                  <div className="flex-1 pr-2">{"สร้างเมื่อ"}</div>
                  <div className="flex-shrink-0 pl-2">{each?.createdAt}</div>
                </div>
                <div className="flex flex-item">
                  <div className="flex-1 pr-2">{"แก้ไขล่าสุด"}</div>
                  <div className="flex-shrink-0 pl-2">{each?.updatedAt}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleClickFetchMore}
          className="rounded-full px-4 py-2 bg-blue-500 text-white"
        >
          Fetch More
        </button>
      </div>
    </main>
  );
}
