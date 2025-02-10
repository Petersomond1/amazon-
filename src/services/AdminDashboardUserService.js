import { 
    useQuery, 
    useQueryClient,
    useMutation } from "react-query";

import api from "./apiConfig";
//CREATE hook (post new user to api)
export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        //send api update request here
        const result = await api.post("/admin")
        return result
      },
      //client side optimistic update
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(["users"], (prevUsers) => [
          ...prevUsers,
          {
            ...newUserInfo,
            id: (Math.random() + 1).toString(36).substring(7),
          },
        ]);
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  
  //READ hook (get users from api)
  export  function useGetUsers() {
    return useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        //send api request here
        const users = await api.get("/admin/users");
        return users;
      },
      refetchOnWindowFocus: false,
    });
  }
  
  //UPDATE hook (put user in api)
  export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        //send api update request here
        const updatedUser = await api.patch(`/admin/users`, user)
        console.log("here is the updated user")
      },
      //client side optimistic update
      // onMutate: (newUserInfo) => {
      //   queryClient.setQueryData(["users"], (prevUsers) =>
      //     prevUsers?.map((prevUser) =>
      //       prevUser.id === newUserInfo.id ? newUserInfo : prevUser
      //     )
      //   );
      // },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }
  
//DELETE hook (delete user in api)
export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId) => {
        //send api delete request here
       const result =  await api.delete(`/admin/users/${userId}`); //api call to delete the user by id
        return result
      },
      //client side optimistic update
      onMutate: async (userId) => {
        await queryClient.cancelQueries({ queryKey: ["users"] });
  
        const previousUsers = queryClient.getQueryData(["users"]);
  
      },
      onError: (err, userId, context) => {
        queryClient.setQueryData(["users"], context.previousUsers);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] }); //refetch users after mutation
      },
    });
  }
  
  
export  const validateRequired = (value) => !!value.length;
  const validateEmail = (email) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  
      export  function validateUser(user) {
    return {
      name: !validateRequired(user.name) ? "First Name is Required" : "",
      last_name: !validateRequired(user.last_name) ? "Last Name is Required" : "",
      email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
    };
  }
  