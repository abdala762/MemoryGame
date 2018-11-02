using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JogoMemoria.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public void FinalizarTentativa(string nomeJogador,int tentativas, bool venceu, DateTime inicio, DateTime fim)
        {
            var caminhoProjeto = AppDomain.CurrentDomain.BaseDirectory;
            using (StreamWriter writer = System.IO.File.AppendText(caminhoProjeto + @"/resultados.txt"))
            {
                writer.WriteLine(nomeJogador + "," + tentativas + "," + venceu + "," + inicio + "," + fim);
            }
        }
    }
}