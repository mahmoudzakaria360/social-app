import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Home() {
  // Initialize the useForm hook to manage form state and validation to>>>> create a post<<<
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      body: '',
      image: '',
    },
  });

  async function onSubmitForm(values) {
    const form = new FormData();

    if (values.body) {
      form.append('body', values.body);
    }
    if (values.image && values.image[0]) {
      form.append('image', values.image[0]);
    }
    try {
      const response = await axios.post(
        'https://linked-posts.routemisr.com/posts',
        form,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        },
      );
      if (response.data.message === 'success') {
        toast.success('Post created successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create post');
    } finally {
      // Reset the form after submission
      reset();
    }
  }

  // Function to fetch all posts from the API
  async function getAllPosts() {
    return await axios.get(
      'https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt',
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      },
    );
  }

  // Function to >>>>delete<<<<a post by its ID
  async function deletePosts(poistId) {
    try {
      return await axios.delete(
        `https://linked-posts.routemisr.com/posts/${poistId}`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        },
        toast.success('Post deleted', {
          position: 'top-center',
          autoClose: 3000,
          icon: '❌',
        }),
      );
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  }

  // Use the useQuery hook to fetch posts and manage loading and error states
  const { error, isLoading, isError, data } = useQuery({
    queryKey: ['getPosts'],
    queryFn: getAllPosts,
    staleTime: 5000, // Data is considered fresh for 5 seconds
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: 3000, // Wait 3 seconds before retrying a failed request
    refetchInterval: 10000, // Refetch data every 10 seconds to keep it up-to-date`
    fetchInBackground: false, // no fetching in the background when the window is not focused
  });

  // Extract posts from the response data
  const posts = data?.data?.posts;

  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (isError) return <h3>Error: {error.message}</h3>;

  return (
    <>
      {/* start of form  */}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-8/12 m-auto mt-5 bg-gray-500 mb-5"
      >
        <div className="form bg-gray-700">
          <input
            {...register('body')}
            placeholder="what is on ypur mind ?"
            className="bg-white rounded-md w-full p-2 cursor-pointer"
            type="text"
          />
          <input
            {...register('image')}
            className="bg-white rounded-md w-full p-2 cursor-pointer"
            type="file"
          />
          <button className="bg-blue-600 text-white rounded-md w-full p-2 cursor-pointer  hover:scale-[1.01] transition">
            Post
          </button>
        </div>
      </form>
      {/* end of form  */}
      <div className="posts-container">
        {posts?.map(post => (
          <div className="post-card bg-white shadow-md rounded-lg w-8/12 m-auto mt-5 p-4 hover:scale-[1.01] transition">
            {/*  */}
            <div className="flex items-center justify-between gap-2">
              <div className="post-head flex items-center gap-2">
                <img
                  src={post?.user?.photo || '/react.svg'}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h4 className="font-semibold">{post?.user?.name}</h4>
              </div>
              {/* x mark  */}
              <div
                onClick={() => deletePosts(post._id)}
                className="xxx text-white bg-red-700 cursor-pointer border border-red-700 rounded-full p-1 hover:scale-[1.07] transition"
              >
                <i className="fa-solid fa-x"></i>
              </div>
            </div>
            <Link key={post._id} to={`/PostDetails/${post._id}`}>
              <p className="bg-gray-200 mt-3 p-2 rounded text-center">
                {post?.body}
              </p>
              {post?.image && (
                <div className="flex justify-center mt-3">
                  <img
                    src={post.image}
                    alt="post"
                    className="rounded max-h-96 object-cover"
                  />
                </div>
              )}
              <div className="text-gray-500 text-sm mt-2">
                {post?.createdAt?.slice(0, 10)}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
