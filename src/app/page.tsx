export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Geleceğin Yazılım Teknolojilerine Hoş Geldiniz
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
                Veritabanından (NestJS) dinamik olarak beslenen bu üst menüyü inceleyebilirsiniz.
                Admin paneline veri ekledikçe menü otomatik olarak güncellenecektir.
            </p>
        </div>
    );
}