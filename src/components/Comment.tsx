import Image from "next/image";
import MDEditor from "@uiw/react-md-editor";

interface CommentProps {
  data: {
    _id: string;
    content: string;
    create_at: string;
    id_creator: {
      _id: string;
      name: string;
      nick: string;
      avatar: string;
    };
  };
}

export function Comment(props: CommentProps) {
  return (
    <li className="border-b-2 border-indigo-950 bg-transparent">
        <div className="flex gap-2">
        {props.data.id_creator.avatar ? (
          <Image src={props.data.id_creator.avatar} width={32} height={32} alt="imagem" />
        ) : (
          <div className="bg-white w-fit h-fit rounded-3xl">
            <Image src="/logo_black.png" width={32} height={32} alt="avatar" />
          </div>
        )}
        <div>
          <h1 className="font-medium text-[1.rem]">
            {props.data.id_creator.name}
          </h1>
          <h3 className="font-light text-[0.75rem]">
            {props.data.id_creator.nick}
          </h3>
        </div>
      </div>
      <MDEditor.Markdown
        source={props.data.content}
        style={{ backgroundColor:"transparent", color: "white", padding:".5rem 1rem" }}
      />
    </li>
  );
}
