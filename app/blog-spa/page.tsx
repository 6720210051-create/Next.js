'use client'; // ← บรรทัดแรกเสมอ
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // ← 1. เพิ่ม import ของ Next.js
import type { ExternalItem } from '@/lib/external';

export default function BlogSpaPage() {
    // 2. เรียกใช้ hooks ของ Next.js ภายใน Component
    const router = useRouter();
    const searchParams = useSearchParams();

    // 3. อ่านค่าเริ่มต้นจาก URL (?source=news)
    const initialSource = searchParams.get('source') === 'news' ? 'news' : 'products';

    // 4. ประกาศ State โดยใช้ค่าเริ่มต้นที่อ่านได้จาก URL
    const [items, setItems] = useState<ExternalItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [source, setSource] = useState<'products' | 'news'>(initialSource);

    // 5. สร้างฟังก์ชันสำหรับเปลี่ยนหน้า (อัปเดต State + เปลี่ยน URL แบบไม่ reload)
    function selectSource(s: 'products' | 'news') {
        setSource(s);
        router.replace(`/blog-spa?source=${s}`); // ← ไม่ reload
    }

    // 6. ใช้ useEffect ดึงข้อมูลใหม่ทุกครั้งที่ source เปลี่ยน
    useEffect(() => {
        setIsLoading(true); // เริ่มโหลดข้อมูลใหม่
        fetch(`/api/aggregate?source=${source}`)
            .then((r) => r.json())
            .then((data: { external: ExternalItem[] }) => {
                setItems(data.external);
                setIsLoading(false); // โหลดเสร็จแล้ว
            });
    }, [source]); 

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">
                🧩 Blog Aggregator (SPA)
            </h1>

            {/* ปุ่ม Tab — วางเหนือ items grid */}
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => selectSource('products')} // ← เปลี่ยนมาใช้ฟังก์ชัน selectSource
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        source === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Products
                </button>
                <button 
                    onClick={() => selectSource('news')} // ← เปลี่ยนมาใช้ฟังก์ชัน selectSource
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        source === 'news' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    News
                </button>
            </div>

            {/* ส่วนแสดงผลข้อมูล */}
            {isLoading ? (
                <p className="text-gray-400">กําลังโหลด...</p>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 bg-white rounded-lg border shadow-sm">
                            <h2 className="font-bold text-blue-800">{item.title}</h2>
                            <p className="text-gray-500 text-sm">{item.subtitle}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}