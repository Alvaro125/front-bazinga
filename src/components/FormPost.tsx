import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { codePreview } from "./ButtonMD";
import axios from "axios";
import { parseCookies } from "nookies";
import { RootState } from "@/store/postStore";
import { useSelector, useDispatch } from "react-redux";
import { show, hidden, review } from "@/store/postSlice";
import { toast } from "react-toastify";
import { link } from "fs";

interface FormPostProps {
  show: boolean;
  change: any;
}
const cookies = parseCookies();
export function FormPost(props: FormPostProps) {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [file, setFile] = useState<any>(null);

  const handlePost = async (e: any) => {
    const fd = new FormData();
    fd.append("file", file);
    try {
      let link = null;
      if (file) {
        link = await axios.post("http://localhost:3000/api/upload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies["auth"]}`,
          },
        });
      }
      let url = link ? link.data.Location : "";
      const post = await axios.post(
        "http://localhost:3000/api/posts",
        {
          url: url,
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
    } catch (err: any) {
      console.log(err.response.data);
      toast.error(err.response.data.message.join(", "));
    }
  };
  const handleFile = async (e: any) => {
    const oFReader = new FileReader();
    setFile(e.target.files[0]);
    oFReader.readAsDataURL(e.target.files[0]);
    oFReader.onload = function (oFREvent:any) {
      setImg(oFREvent.target.result)
    };
  };

  return (
    <div
      className={`bg-white fixed ${
        props.show ? "flex" : "hidden"
      } flex-col items-center justify-center w-full p-4 min-h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <CloseIcon
        onClick={(e) => {
          props.change(!props.show);
        }}
        className="absolute left-1 -top-[2rem]"
      ></CloseIcon>
      {img.length && <img src={img} className="w-[20rem]"/>}
      <img src="" alt="" />
      <input type="file" id="file" name="file" onChange={handleFile} className="bg-red h-4"/>
      <MDEditor
        value={value}
        preview="edit"
        extraCommands={[codePreview]}
        onChange={(val) => {
          setValue(val!);
        }}
        style={{ width: "95%", position: "relative" }}
        height={100}
      />
      <button onClick={handlePost} className="bg-[#1a103c] text-white">
        Enviar
      </button>
    </div>
  );
}
