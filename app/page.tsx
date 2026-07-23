// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'หน้าแรก',
};

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getRecentPosts(): Promise<Post[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=3',
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function Home() {
  const posts: Post[] = await getRecentPosts();

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* ส่วนหัวและการ์ดโปรไฟล์ */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold text-blue-900 mb-8">สวัสดี! 👋</h1>

        {/* Profile Card */}
        <div className="max-w-3xl mx-auto mb-10 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row text-left transition-all hover:shadow-xl">
          
          {/* รูปโปรไฟล์ */}
          <div className="md:w-1/3 bg-blue-50 flex justify-center items-center p-8">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image 
                src="/images/1234.jpg" /* <--- แก้ไข Path รูปภาพตรงนี้ให้ดึงจากโฟลเดอร์ images */
                alt="Profile Picture" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* ข้อมูลส่วนตัว */}
          <div className="md:w-2/3 p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Achiraya Thongyam</h2>
            <p className="text-blue-600 font-medium text-lg mb-4 border-b pb-4">
              ชื่อเล่น: <span className="text-gray-400">[ออม]</span> • รหัสนักเรียน: <span className="text-gray-400">[6720210051]</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="mb-2"><strong>🎓 การศึกษา:</strong></p>
                <p className="text-gray-600">นิสิตชั้นปีที่ 3<br/>มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง</p>
              </div>
              <div>
                <p className="mb-2"><strong>🎯 เป้าหมายในชีวิต:</strong></p>
                <p className="text-gray-600">ดูแลคุณพ่อคุณแม่และครอบครัวให้สุขสบายในอนาคต</p>
              </div>
              <div>
                <p className="mb-2"><strong>💻 ความสนใจ & งานอดิเรก:</strong></p>
                <p className="text-gray-600">เขียนโปรแกรม พัฒนาเว็บไซต์ (Laravel, Node.js)</p>
              </div>
              <div>
                <p className="mb-2"><strong>🏐 กีฬา & เกมที่ชอบ:</strong></p>
                <p className="text-gray-600">นักกีฬาวอลเลย์บอลโรงเรียน / เล่นเกม eFootball</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/posts"
          className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md inline-block">
          อ่านบทความทั้งหมด →
        </Link>
      </div>

      {/* บทความล่าสุด */}
      <div className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
          <span className="w-2 h-8 bg-blue-600 mr-3 rounded-full"></span>
          บทความล่าสุด
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post: Post) => (
            <Link key={post.id} href={`/posts/${post.id}`}
              className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
              <h3 className="font-bold text-blue-800 mb-3 text-lg group-hover:text-blue-600 line-clamp-2">{post.title}</h3>
              <p className="text-gray-500 text-sm flex-grow line-clamp-3">{post.body}</p>
              <p className="text-blue-500 text-sm font-medium mt-4">อ่านเพิ่มเติม →</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}