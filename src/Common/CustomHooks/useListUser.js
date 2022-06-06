import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosCustom from "../../Axios/AxiosCustom";

export default function useListUser() {
  const [user, setUser] = useState([]);
  const getData = async () => {
    return axiosCustom.get("user");
  };
  const { data, isFetching } = useQuery("get-users", getData, {
    initialData: [],
  });
  useEffect(() => {
    if (data.data) {
      const list = data.data;
      console.log("list", list);
      const keylist = [];
      list.forEach((each, index) => {
        const key = index;
        each = { ...each, key };
        each.expireddate = new Date(each.expireddate).toLocaleDateString();
        each.syncdate = new Date(each.syncdate).toLocaleDateString();
        keylist.push(each);
      });
      setUser(keylist);
    }
  }, [data]);
  return { user, setUser, isFetching };
}
