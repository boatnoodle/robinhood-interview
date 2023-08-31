"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import commentService from "@/services/comment";
import interviewService from "@/services/interview";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export default function Home({ params }: { params: { id: string } }) {
  const [interview, setInterview] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [meta, setMeta] = useState<any>(null);
  const [comment, setComment] = useState<any>("");
  const [offset, setOffset] = useState(0);
  const [current, setCurrent] = useState(0);
  const [limit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  async function fetchInterviewById(id: string) {
    try {
      setIsLoading(true);
      const response = await interviewService.getInterview(id);
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchInterviewComments(id: string) {
    try {
      setIsLoading(true);
      const response = await commentService.getInterviewComments({
        interviewId: id,
        offset,
        limit,
      });
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateInterviewById(id: string, updates: any) {
    try {
      setIsLoading(true);
      await interviewService.updateInterview(id, updates);
      const response = await fetchInterviewById(id);
      setInterview(response.data.result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addComment(id: string, comment: string) {
    try {
      setIsLoading(true);
      await commentService.createComment({ interviewId: id, comment });
      const response = await fetchInterviewComments(id);
      setComment("");
      setComments(response.data.result);
      setMeta(response.data.meta);
      setOffset(0);
      setCurrent(0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleClickArchived = () => {
    updateInterviewById(params.id, { status: "archived" }).then(() => {
      alert("Archived!");
      push("/interview");
    });
  };

  const handleAddComment = () => {
    if (comment) addComment(params.id, comment);
  };

  const handleClickFetchMore = () => {
    const next = current + 1;
    setOffset(limit * next);
    setCurrent(next);
  };

  const renderLoading = () => (
    <ClipLoader
      color={"#ffffff"}
      loading={true}
      size={20}
      aria-label="Loading Spinner"
    />
  );

  useEffect(() => {
    if (params.id) {
      fetchInterviewById(params.id).then((response) =>
        setInterview(response.data.result)
      );
      fetchInterviewComments(params.id).then((response) => {
        setComments(response.data.result);
        setMeta(response.data.meta);
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (offset)
      fetchInterviewComments(params.id).then((response) => {
        setComments([...comments, ...response.data.result]);
        setMeta(response.data.meta);
      });
  }, [offset]);

  if (!interview || !meta) return renderLoading();

  return (
    <>
      <div className="flex pl-24 py-4">
        <Link href="/interview">ย้อนกลับ</Link>
      </div>
      <main className="flex flex-col items-center justify-between p-24 pt-0">
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
                  disabled={isLoading}
                >
                  เพิ่มความคิดเห็น {isLoading ? renderLoading() : <></>}
                </button>
              </div>
              <div className="flex justify-end">
                พบทั้งสิ้น {meta?.totalDocument || "0"} รายการ
              </div>
              <div className="flex flex-col gap-6">
                {!comments ? renderLoading() : <></>}
                {comments &&
                  comments.length > 0 &&
                  comments.map((each: any, idx: any) => (
                    <div className="flex items-center py-2 border-b" key={idx}>
                      <div className="flex-shrink-0 text-2xl mr-4">{"😊"}</div>
                      <div className="flex-grow">{each.comment}</div>
                    </div>
                  ))}
              </div>

              {comments && comments.length !== meta.totalDocument ? (
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={handleClickFetchMore}
                    className="rounded-full px-4 py-2 bg-blue-500 text-white"
                    disabled={isLoading}
                  >
                    ดูเพิ่มเติม {isLoading ? renderLoading() : <></>}
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
                    <div className="flex-shrink-0 text-sm mr-2">
                      {"สร้างโดย"}
                    </div>
                    <div className="flex-grow">
                      <div className="text-sm">
                        {interview.createdBy || "-"}
                      </div>
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
                    disabled={isLoading}
                  >
                    จัดเก็บ {isLoading ? renderLoading() : <></>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
