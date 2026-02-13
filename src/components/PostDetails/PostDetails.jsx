import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetails() {
  const [Allcommments, setAllCommments] = useState([]);
  const [post, setPost] = useState(null);
  // Get the post ID from the URL parameters
  const { id } = useParams();
  // Fetch post details when the component mounts
  useEffect(() => {
    async function getPostDetails() {
      try {
        const { data } = await axios.get(
          `https://linked-posts.routemisr.com/posts/${id}`,
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        );
        if (data.message === 'success') {
          setPost(data.post);
          console.log(data.post);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    }

    // get cooments function
    async function getAllComments() {
      try {
        const { data } = await axios.get(
          `https://linked-posts.routemisr.com/posts/${id}/comments`,
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        );
        if (data.message == 'success') {
          console.log(data);
          setAllCommments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPostDetails();
    getAllComments();
  }, [id]);
  if (post === null) {
    <h2>loading.......</h2>;
  }

  return (
    <>
      <div className="post-card bg-slate-200 shadow-md rounded-lg w-8/12 m-auto mt-5 p-4 hover:scale-[1.01] transition">
        <div className="flex items-center justify-between gap-2">
          <div className="post-head flex items-center gap-2">
            <img
              src={post?.user?.photo || '/react.svg'}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h4 className="font-semibold">{post?.user?.name}</h4>
          </div>
          {/* exit mark
          <div className="xxx text-white bg-slate-700 cursor-pointer border border-red-700 rounded-full p-1 hover:scale-[1.07] transition ">
            <i className="fa-solid fa-arrow-right"></i>
          </div> */}
        </div>
        {/* post content */}
        <p className="bg-gray-100 mt-3 p-2 rounded text-center">{post?.body}</p>
        {/*   post img   */}
        {post?.image && (
          <div className="flex justify-center mt-3">
            <img
              src={post.image}
              alt="post"
              className="rounded max-h-96 object-cover"
            />
          </div>
        )}
        {/*   post date  */}
        <div className="text-gray-500 text-sm mt-2">
          {post?.createdAt?.slice(0, 10)}
        </div>
        {/*  comments  */}
        <div className="bg-white shadow-md rounded-lg w-8/12 m-auto mt-5 pb-4 mb-5">
          <div className="text-gray-400">
            {post?.Allcommments?.map(comment => (
              <div key={comment._id} className="mb-2">
                <h5 className="font-semibold text-gray-600">
                  {comment.creator}
                </h5>
                <p className="text-gray-400">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
