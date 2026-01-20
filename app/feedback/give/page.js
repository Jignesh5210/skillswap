'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GiveFeedback() {
  const params = useSearchParams();
  const router = useRouter();

  const toUser = params.get("to");
  const initialRating = Number(params.get("rating"));

  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState("");
  const [me, setMe] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(d => setMe(d.user));

    fetch(`/api/user/profile?userId=${toUser}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(d => setUser(d.user));
  }, [toUser]);

  const submit = async () => {
    try {
      const res = await fetch("/api/feedback/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUser, rating, comment })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert("Feedback submitted ✅");
        router.push(`/profile/${toUser}`);
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch {
      alert("Network error ❌");
    }
  };

  if (!me || !user) return <p>Loading...</p>;

  return (
    // <div className="min-h-screen flex justify-center items-center text-white">
    //   <div className="bg-black/70 p-8 rounded-xl w-[420px]">

    //     <img src={me.image} className="w-20 h-20 rounded-full mx-auto" />
    //     <p className="text-center mt-2">
    //       {me.name} ({me.email})
    //     </p>

    //     <div className="text-center text-2xl mt-4">
    //       {[1,2,3,4,5].map(s => (
    //         <span
    //           key={s}
    //           onClick={() => setRating(s)}
    //           className="cursor-pointer"
    //         >
    //           {s <= rating ? "★" : "☆"}
    //         </span>
    //       ))}
    //     </div>

    //     <textarea
    //       value={comment}
    //       onChange={e => setComment(e.target.value)}
    //       placeholder="Write your feedback..."
    //       className="w-full mt-4 p-3 bg-black/40 rounded"
    //     />

    //     <button
    //       onClick={submit}
    //       className="w-full mt-4 bg-purple-600 py-2 rounded"
    //     >
    //       Save Feedback
    //     </button>
    //   </div>
    // </div>

    <div
      className="
    relative
    flex items-center justify-center
    w-full
    min-h-[100svh]
    overflow-hidden
    bg-gradient-to-br from-[#0a0b18] via-[#0e1030] to-[#06070f]
    px-4
  "
    >
      {/* Soft Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[160px]" />
        <div className="absolute bottom-[-35%] right-1/3 w-[420px] h-[420px] bg-purple-500/20 blur-[150px]" />
      </div>

      {/* Feedback Card */}
      <div
        className="
      relative z-10
      w-full max-w-sm
      rounded-2xl
      bg-white/10 backdrop-blur-xl
      border border-white/15
      shadow-[0_20px_60px_rgba(0,0,0,0.6)]
      px-6 py-7
    "
      >
        {/* User */}
        <div className="flex flex-col items-center text-center">
          <img
            src={me.image}
            alt="profile"
            className="
          w-20 h-20
          rounded-full object-cover
          ring-2 ring-indigo-400/60
          shadow-md
        "
          />

          <h2 className="mt-4 text-lg font-semibold text-white">
            {me.name}
          </h2>

          <p className="text-xs text-slate-400 break-all">
            {me.email}
          </p>
        </div>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-white/10" />

        {/* Rating */}
        <div className="flex justify-center gap-1 text-3xl">
          {[1, 2, 3, 4, 5].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              className={`
            transition transform
            ${s <= rating
                  ? "text-yellow-400 scale-110"
                  : "text-gray-500 hover:text-gray-300"}
          `}
            >
              ★
            </button>
          ))}
        </div>

        {/* Feedback Input */}
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={3}
          className="
        mt-5 w-full
        rounded-xl
        bg-black/30 text-white
        border border-white/20
        px-4 py-3
        text-sm
        resize-none
        focus:outline-none
        focus:ring-2 focus:ring-indigo-500
        placeholder:text-slate-400
      "
        />

        {/* Submit */}
        <button
          onClick={submit}
          className="
        mt-6 w-full
        rounded-xl py-3
        font-semibold text-white
        bg-gradient-to-r from-indigo-500 to-purple-600
        shadow-lg
        hover:opacity-90
        active:scale-[0.98]
        transition
      "
        >
          Save Feedback
        </button>
      </div>
    </div>

  );
}
