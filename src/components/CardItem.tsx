import { Transition } from "@headlessui/react";
import Image from "next/image";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Send";
import { Fragment, useContext, useState } from "react";
import MDEditor, {
  commands,
  ICommand,
  EditorContext,
} from "@uiw/react-md-editor";
import { Comment } from "./Comment";
import axios from "axios";
import { parseCookies } from "nookies";
import type { RootState } from "@/store/postStore";
import { useSelector, useDispatch } from "react-redux";
import { show, hidden, review } from "@/store/postSlice";
import { codePreview } from "./ButtonMD";

interface CardProps {
  post: {
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
  };
}
const cookies = parseCookies();

export function CardItem(props: CardProps) {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();

  const [showComment, setShowComment] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleComment = async (event: any) => {
    await axios.post(
      `http://localhost:3000/api/posts/${props.post._id}/comment`,
      {
        content: value,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies["auth"]}`,
        },
      }
    );
    const res = await axios.get("http://localhost:3000/api/posts", {
      headers: {
        Authorization: `Bearer ${cookies["auth"]}`,
      },
    });
    dispatch(review(res.data));
  };
  return (
    <li className="h-auto bg-[#1a103c] text-white w-10/12 px-8 py-6 rounded-[1rem] transition-all">
      <div className="flex gap-2">
        {props.post.id_creator.avatar ? (
          <Image src={props.post.img} width={50} height={50} alt="imagem" />
        ) : (
          <div className="bg-white w-fit h-fit rounded-3xl">
            <Image src="/logo_black.png" width={50} height={50} alt="avatar" />
          </div>
        )}
        <div>
          <h1 className="font-medium text-[1.25rem]">
            {props.post.id_creator.name}
          </h1>
          <h3 className="font-light text-[0.75rem]">
            {props.post.id_creator.nick}
          </h3>
        </div>
      </div>
      {props.post.img && (
        <div className="image-container mt-2">
          <img src={props.post.img} className="image" alt="img"/>
        </div>
      )}
      <MDEditor.Markdown
        source={props.post.content}
        style={{ backgroundColor:"transparent", color: "white", padding:".5rem 1rem" }}
      />
      <div className="flex justify-end">
        <span>{props.post.comments.length}</span>
        <CommentIcon
          onClick={function () {
            setShowComment(!showComment);
          }}
        ></CommentIcon>
        <span>{props.post.likes.length}</span>
        <ThumbUpIcon></ThumbUpIcon>
      </div>
      <Transition
        show={showComment}
        enter="transition ease duration-500 transform"
        enterFrom="opacity-0 -translate-y-12"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-12"
        data-color-mode="dark"
      >
        <MDEditor
          value={value}
          preview="edit"
          extraCommands={[codePreview]}
          onChange={(val) => {
            setValue(val!);
          }}
          height={100}
        />
        <div className="flex justify-end mt-2">
          <button
            className="text-[#c3cad5] bg-[#d62839] flex items-center justify-center px-2 py-1 rounded-sm"
            onClick={handleComment}
          >
            <span>Enviar</span>
            <SendIcon></SendIcon>
          </button>
        </div>
        <ul className="flex flex-col-reverse gap-4 mt-2">
          {props.post.comments.map((comment, index) => (
            <Comment data={comment} key={index}></Comment>
          ))}
        </ul>
      </Transition>
    </li>
  );
}
