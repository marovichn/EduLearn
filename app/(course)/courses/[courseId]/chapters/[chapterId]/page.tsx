import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { Button } from "@/components/ui/button";
import { Logo } from "@/app/(dashboard)/_components/logo";
import { MdCastForEducation } from "react-icons/md";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant='success' label='You already completed this chapter.' />
      )}
      {isLocked && (
        <Banner
          variant='warning'
          label='You need to purchase this course to watch this chapter.'
        />
      )}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className='p-4'>
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className='p-4 flex flex-col md:flex-row items-center justify-between'>
            <h2 className='text-2xl font-semibold mb-2'>{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator className='mt-5' />
          {true ? (
            <div className='p-10 bg-gray-200'>
              <div className='flex items-center p-0 mb-5'>
                <MdCastForEducation className='text-black mr-4' size={40} />

                <span className='self-center text-3xl font-bold whitespace-nowrap text-black'>
                  EduGrade <span className="text-yellow-500">Student</span>
                </span>
              </div>
              <h1 className='text-xl font-semibold mb-2'>Assignment?</h1>
              <p className='mb-5'>
                Marking lessons as assignment will add current lesson to your{" "}
                <span className='font-semibold'>EduGrade</span>, with{" "}
                <span className='font-semibold'>7 day</span> time period to
                finish, each lesson is worth{" "}
                <span className='font-semibold'>(10 points)</span>.
              </p>
              {true /* !isAssigned */ ? (
                <Button>Mark this lesson as an assignment</Button>
              ) : (
                <Button>Mark as finished</Button>
              )}
            </div>
          ) : null}
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className='p-4'>
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target='_blank'
                    key={attachment.id}
                    className='flex items-center p-3 w-full bg-yellow-200 border text-yellow-700 rounded-md hover:underline'
                  >
                    <File />
                    <p className='line-clamp-1'>{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
