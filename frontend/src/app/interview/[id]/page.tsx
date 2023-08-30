"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import commentService from "@/services/comment";
import interviewService from "@/services/interview";

export default function Home({ params }: { params: { id: string } }) {
  const [interview, setInterview] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [comment, setComment] = useState<any>("");
  const [offset, setOffset] = useState(0);
  const [current, setCurrent] = useState(1);
  const [limit, setLimit] = useState(5);
  const { push } = useRouter();

  async function fetchInterviewById(id: string) {
    try {
      const response = await interviewService.getInterview(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchInterviewComments(id: string) {
    try {
      const response = await commentService.getInterviewComments(id, {
        offset,
        limit,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateInterviewById(id: string, updates: any) {
    try {
      await interviewService.updateInterview(id, updates);
      const response = await fetchInterviewById(id);
      setInterview(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function addComment(id: string, updates: any) {
    try {
      await commentService.createComment(id, updates);
      const response = await fetchInterviewComments(id);
      setComment("");
      setComments(response);
      setOffset(0);
      setCurrent(0);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickArchived = () => {
    updateInterviewById(params.id, { status: "archived" }).then(() => {
      alert("Archived!");
      push("/interview");
    });
  };

  const handleAddComment = () => {
    if (comment) addComment(params.id, { comment });
  };

  const handleClickFetchMore = () => {
    const next = current + 1;
    setOffset(limit * next);
    setCurrent(next);
  };

  useEffect(() => {
    if (params.id) {
      fetchInterviewById(params.id).then((response) => setInterview(response));
      fetchInterviewComments(params.id).then((response) =>
        setComments(response)
      );
    }
  }, [params.id]);

  useEffect(() => {
    if (offset)
      fetchInterviewComments(params.id).then((response) =>
        setComments([...comments, ...response])
      );
  }, [offset]);

  if (!interview) return <>Loading</>;

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="w-full min-h-screen p-4 rounded-md border border-black bg-slate-400">
        <div className="flex min-h-screen ">
          <div className="flex-1 pr-4">
            {/* Content for the first column goes here */}
            <h4 className="text-xl font-semibold mb-4">{interview.title}</h4>
            <h5 className="text-xl font-semibold mb-4">คำอธิบาย</h5>
            <div className="w-full p-4 mb-8 rounded-md border border-black">
              {interview.description}
            </div>
            <h4 className="text-xl font-semibold mb-4">ความคิดเห็น</h4>

            <div className="flex items-center mb-4">
              <input
                type="text"
                className="flex-grow p-2 border rounded text-black"
                placeholder="เพิ่มความคิดเห็น"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddComment}
              >
                เพิ่มความคิดเห็น
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {comments &&
                comments.length > 0 &&
                comments.map((each: any, idx: any) => (
                  <div className="flex items-center py-2 border-b" key={idx}>
                    <div className="flex-shrink-0 text-2xl mr-4">{"😊"}</div>
                    <div className="flex-grow">{each.comment}</div>
                  </div>
                ))}
            </div>

            {comments && comments.length > 0 ? (
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
          </div>
          <div className="w-64 flex flex-col justify-between border-l">
            <div className="p-2 mb-2">
              <h4 className="text-xl font-semibold mb-4">รายละเอียด</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center py-2">
                  <div className="flex-shrink-0 text-sm mr-2">{"สร้างโดย"}</div>
                  <div className="flex-grow">
                    <div className="text-sm">{interview.createdBy || "-"}</div>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <div className="flex-shrink-0 text-sm mr-2">
                    {"สร้างเมื่อ"}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm">{interview.createdAt}</div>
                  </div>
                </div>
                <div className="flex items-center py-2">
                  <div className="flex-shrink-0 text-sm mr-2">{"สถานะ"}</div>
                  <div className="flex-grow">
                    <div className="text-sm">{interview.status}</div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-t my-2" />
            <div className="p-2 flex-grow">
              <div className="flex justify-center items-center ">
                <button
                  onClick={handleClickArchived}
                  className="rounded-md px-4 py-2 bg-blue-500 text-white"
                >
                  จัดเก็บ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
