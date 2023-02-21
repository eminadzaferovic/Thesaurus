using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models;

namespace Core.Interfaces
{
    public interface IThesaurusRepository
    {
        Task AddSynonymsForWord(Thesaurus thesaurus);  
        //Task<List<string>> GetSynonymsForWord(string word);
        Task<string> GetSynonymsForWord(string word);
        Task<Hashtable> GetThesaurus();
    }
}