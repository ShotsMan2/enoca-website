// 1. Fonksiyonun başına 'async' ekliyoruz ve params tipini 'Promise' olarak güncelliyoruz
export default async function DynamicPage({
    params
}: {
    params: Promise<{ category: string, slug: string }>
}) {

    // 2. URL parametrelerinin yüklenmesini bekliyoruz (İşte sihir burada!)
    const resolvedParams = await params;

    // 3. Parametreler yüklendiği için artık 'slug' verisine güvenle erişebiliriz
    const pageTitle = resolvedParams.slug.replace(/-/g, ' ');

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-wider text-blue-700 uppercase bg-blue-100 rounded-full">
                {resolvedParams.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 capitalize">
                {pageTitle}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                Tebrikler! Bu sayfa Next.js Dynamic Routing özelliği sayesinde veritabanından gelen URL'ye göre otomatik olarak oluşturuldu.
                <br /><br />
                Artık admin panelinden yeni bir menü eklediğinizde, o menüye ait sayfa anında burada aktif olacaktır.
            </p>
        </div>
    );
}