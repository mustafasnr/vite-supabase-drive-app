import RegisterForm from "@/components/register/register_form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Kayıt içerik alanı */}
      <section className="col-span-1 flex h-full w-full items-center justify-center border-r px-6 py-10">
        <div className="w-full space-y-6">
          {/* Başlık alanı */}
          <header className="text-center">
            <h1 className="text-3xl font-bold">Kayıt Ol</h1>
            <p className="text-muted-foreground mt-2">
              Hemen kayıt olun ve avantajlardan yararlanmaya başlayın.
            </p>
          </header>

          {/* Kayıt formu */}
          <RegisterForm />

          {/* Ayırıcı */}
          <div className="flex flex-row items-center gap-4">
            <div className="flex-1">
              <Separator />
            </div>
            <span className="text-sm text-gray-500">veya</span>
            <div className="flex-1">
              <Separator />
            </div>
          </div>

          {/* Sosyal medya ile kayıt */}
          <section className="space-y-3" aria-label="Sosyal medya ile kayıt">
            <Button variant="outline" className="w-full cursor-pointer">
              {/* Apple ikonu */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Apple Hesabınla Kaydol
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              {/* Google ikonu */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Google Hesabınla Kaydol
            </Button>
          </section>

          {/* Giriş sayfasına yönlendirme */}
          <footer className="text-center text-sm">
            Zaten hesabın var mı?{" "}
            <Link to="/giris" className="underline underline-offset-4">
              Giriş Yap
            </Link>
          </footer>
        </div>
      </section>

      {/* Görsel alan */}
      <aside
        className="sticky top-0 hidden h-screen bg-[url(/pattern.svg)] bg-repeat p-10 sm:col-span-1 sm:block lg:col-span-2 dark:bg-[url(/dark_pattern.svg)]"
        style={{
          backgroundRepeat: "repeat",
          // filter: "invert(1)", // dark mode'da görünürlük için
        }}
      >
        <Card className="text-orange h-full w-full rounded-2xl border border-white/0 bg-white/5 p-5 shadow-lg backdrop-blur-[2.5px] dark:bg-white/5">
          <p>Kayıt Ol</p>
        </Card>
      </aside>
    </div>
  );
}

export default RegisterPage;
