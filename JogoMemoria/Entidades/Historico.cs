using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JogoMemoria.Entidades
{
    public class Historico
    {
        public string NomeJogador { get; set; }
        public int Tentativas { get; set; }
        public bool Venceu { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Fim { get; set; }
    }
}