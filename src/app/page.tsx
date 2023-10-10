"use client";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/Navbar";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CardItem } from "@/components/CardItem";
import type { RootState } from "@/store/postStore";
import { useSelector, useDispatch } from "react-redux";
import { show, hidden, review } from "@/store/postSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormPost } from "@/components/FormPost";
import { Transition } from "@headlessui/react";
import { ToastContainer,toast } from "react-toastify";

interface PostProps {
  comments: Array<{
    _id: string;
    content: string;
    create_at: string;
    id_creator: {
      _id: string;
      name: string;
      nick: string;
      avatar: string;
    };
  }>;
  content: string;
  create_at: string;
  img: string;
  id_creator: {
    _id: string;
    name: string;
    nick: string;
    avatar: string;
  };
  likes: string[];
  __v: number;
  _id: string;
}

const cookies = parseCookies();

export default function Page() {
  const showComments = useSelector(
    (state: RootState) => state.posts.showComments
  );
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const handleShow = function (value: boolean) {
    setIsShowAdd(value);
  };
  useEffect(
    function () {
      if (!cookies["auth"]) {
        return router.push("/login");
      }
      async function getData() {
        const res = await axios.get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: `Bearer ${cookies["auth"]}`,
          },
        });
        if (res.statusText != "OK") {
          throw new Error("Failed to fetch data");
        }
        dispatch(review(res.data));
      }
      getData();
    },
    [dispatch, router]
  );
  return (
    <div className="min-h-screen">
      <Navbar></Navbar>
      <main>
        <ul className="mt-2 list-none flex flex-col items-center gap-4">
          {posts.map((post, index) => (
            <CardItem key={index} post={post} />
          ))}
        </ul>
      </main>
      <AddCircleIcon
        className="fixed text-[#d62839] text-[4rem] bottom-4 right-4"
        onClick={() => {
          setIsShowAdd(!isShowAdd);
        }}
      ></AddCircleIcon>
      <Transition
        show={isShowAdd}
        enter="transition ease duration-500 transform"
        enterFrom="opacity-0 translate-y-12"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-12"
        data-color-mode="dark"
        className="bg-white fixed flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center w-full h-fit p-8"
      >
        <FormPost show={isShowAdd} change={handleShow}></FormPost>
      </Transition>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
