using JogoMemoria.Entidades;
using JogoMemoria.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JogoMemoria.Controllers
{
    public class RankingController : Controller
    {
       
        public ActionResult Index()
        {
            var model = new RankingModel
            {
                ListaHistorico = ObterHistorico()
            };

            return View(model);
        }

        private Historico[] ObterHistorico()
        {
            var caminhoProjeto = AppDomain.CurrentDomain.BaseDirectory;
            string[] linhas = System.IO.File.ReadAllLines(caminhoProjeto + @"/resultados.txt");

            List<Historico> listaHistorico = new List<Historico>();

            foreach(string linha in linhas)
            {
                var linhaSplit = linha.Split(',');
                listaHistorico.Add(new Historico
                {
                    NomeJogador = linhaSplit[0],
                    Tentativas = int.Parse(linhaSplit[1]),
                    Venceu = bool.Parse(linhaSplit[2]),
                    Inicio = DateTime.Parse(linhaSplit[3]),
                    Fim = DateTime.Parse(linhaSplit[4])
                });
            }
            return listaHistorico.ToArray();
        }
    }
}