import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';
import { getUsuarioActual } from '@/lib/getUsuarioActual';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  display: 'swap',
});

export default async function LandingPage() {
  const usuario = await getUsuarioActual();

  // Si el usuario ya está autenticado, redirigir al home
  if (usuario) {
    redirect('/home');
  }

  return (
    <div className="min-h-screen bg-[#1a2744] flex flex-col text-white">
      {/* Inyección de estilos CSS para animaciones premium */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes textShine {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-title {
          opacity: 0;
          animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slogan {
          opacity: 0;
          background: linear-gradient(
            to right,
            #ffffff 20%,
            #4caf50 40%,
            #f4862c 60%,
            #ffffff 80%
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: scaleUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards, textShine 5s linear infinite;
        }
        .animate-desc {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.3s;
        }
        .animate-steps {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.5s;
        }
        .animate-buttons {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.7s;
        }
      `}} />

      {/* Sección Superior (Hero Banner) */}
      <div className="relative w-full py-16 sm:py-24 overflow-hidden flex flex-col items-center justify-center text-center px-6 shadow-lg">
        <img
          src="/banner.jpg"
          alt="Banner ambiental"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay oscuro semi-transparente */}
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: 'rgba(26, 39, 68, 0.75)' }}
        />
        
        {/* Contenido sobre el banner */}
        <div className="relative z-20 flex flex-col items-center max-w-3xl gap-4">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 animate-title">
            <img
              src="/logo.png"
              alt="Logo del instituto"
              width={35}
              height={35}
              className="rounded-full object-cover w-[35px] h-[35px]"
            />
            <span className="text-white font-extrabold text-lg tracking-wide">
              Eco<span className="text-[#f4862c]">Puntos</span>
            </span>
          </div>

          {/* Slogan en fuente Montserrat con degradado animado continuo */}
          <h1 className={`${montserrat.className} text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow-sm mt-2 tracking-tight animate-slogan`}>
            Cada acción cuenta para cuidar nuestro planeta
          </h1>
          
          {/* Texto descriptivo destacado */}
          <p className="text-white/80 text-sm sm:text-base max-w-xl mt-1 leading-relaxed animate-desc">
            Unite a la comunidad verde del instituto <strong className="text-[#f4862c] font-black">Dr Alexis Carrel</strong> y sumá puntos cuidando el medio ambiente y canjealos por increíbles premios.
          </p>
        </div>
      </div>

      {/* Sección del medio: Cómo funciona */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col items-center justify-between gap-10">
        <div className="flex flex-col items-center gap-10 w-full animate-steps">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
              ¿Cómo funciona EcoPuntos?
            </h2>
            <div className="h-1 w-16 bg-[#f4862c] mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Paso 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-all duration-200 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#f4862c] text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Sacá una foto</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  Tomá una foto sosteniendo o recolectando residuos en un espacio público al aire libre.
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-all duration-200 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#4caf50] text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Verificación IA</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  Nuestra Inteligencia Artificial verifica tu acción ecológica analizando la foto al instante.
                </p>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-white/15 transition-all duration-200 shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#f4862c] text-white flex items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Ganá premios</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">
                  ¡Sumá puntos en tu cuenta y canjealos en la tienda por fabulosos premios!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-4 mt-8 animate-buttons">
          <Link
            href="/login"
            className="flex-1 block text-center bg-[#f4862c] hover:bg-[#e07520] active:scale-95 transition-all duration-200 text-white font-extrabold text-lg rounded-2xl py-4 shadow-lg"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="flex-1 block text-center border-2 border-white/30 text-white font-extrabold text-lg rounded-2xl py-4 hover:bg-white/10 hover:border-white/50 active:scale-95 transition-all duration-200 shadow-md"
          >
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
}
