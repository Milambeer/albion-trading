import { useAppSelector } from "../../store/hook";
import { selectError } from "../../store/notificationSlice";
import { ToasterTemplate } from "../../type";
import { Toaster } from "../element/Toaster";

export const Notification = () => {
  const error = useAppSelector(selectError);

  return (
    <>
      {error && (
        <Toaster
          type={ToasterTemplate.ERROR}
          title={error.title}
          content={error.content}
          closeAfterMs={4000}
        ></Toaster>
      )}
    </>
  );
};
