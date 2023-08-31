"use client";

import interviewService from "@/services/interview";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function InterviewPage() {
  const [interviews, setInterviews] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);
  const [current, setCurrent] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClickFetchMore = () => {
    const next = current + 1;
    const offset = limit * next;

    fetchInterviews(offset, limit).then((response) => {
      setInterviews([...interviews, ...response.data.result]);
      setMeta(response.data.meta);
      setOffset(offset);
      setCurrent(next);
    });
  };

  const handleClickCreateInterview = () => {
    if (title && description) createInterview();
  };

  async function fetchInterviews(offset: number, limit: number) {
    try {
      const response = await interviewService.getManyInterview({
        offset,
        limit,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function createInterview() {
    try {
      await interviewService.createInterview({
        title,
        description,
      });
      const offset = 0;
      const current = 0;

      fetchInterviews(offset, limit).then((response) => {
        setInterviews(response.data.result);
        setMeta(response.data.meta);
        setTitle("");
        setDescription("");
        setOffset(offset);
        setCurrent(current);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchInterviews(offset, limit).then((response) => {
      setInterviews(response.data.result);
      setMeta(response.data.meta);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-center ">
            <h4 className="text-xl font-semibold">เพิ่มรายการ</h4>
          </div>
          <div className="flex justify-center ">
            <input
              type="text"
              className="flex-grow p-2 border rounded text-black"
              placeholder="หัวข้อ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <textarea
              rows={5}
              className="flex-grow p-2 border rounded text-black"
              placeholder="รายละเอียด"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleClickCreateInterview}
            >
              เพิ่มรายการ
            </button>
          </div>
        </div>
      </div>
      <main className="flex flex-col gap-6 items-center justify-between p-24">
        <div className="flex">
          พบทั้งสิ้น {meta?.totalDocument || "0"} รายการ
        </div>
        {!interviews ? (
          <ClipLoader
            color={"#ffffff"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
          />
        ) : (
          <></>
        )}
        {interviews &&
          interviews.map((each: any, idx: number) => (
            <div
              className="w-full p-4 rounded-md border border-black bg-slate-400"
              key={idx}
            >
              <Link href={`/interview/${each?._id}`}>
                <h4 className="text-xl font-semibold mb-4 text-cyan-700">
                  {each?.title}
                </h4>
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

        {interviews && interviews?.length != meta?.totalDocument ? (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleClickFetchMore}
              className="rounded-full px-4 py-2 bg-blue-500 text-white"
            >
              ดูเพิ่มเติม
            </button>
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
