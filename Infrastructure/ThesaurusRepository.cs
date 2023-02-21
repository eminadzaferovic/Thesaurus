using System.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;
using Core.Models;
using System.Diagnostics;

namespace Infrastructure
{
    public class ThesaurusRepository : IThesaurusRepository
    {
        private static Hashtable _thesaurus;

        public ThesaurusRepository()
        {
            /* when the object is initially created
               add some values to it; else just retrieve the values */
            if (_thesaurus == null)
            {
                _thesaurus = new Hashtable()
                    //{key, value}
                    {
                    {"work", "effort, job, performance, task"},
                    {"fun", "amusing, entertaining, pleasant" },
                    {"hobby", "craft, obsession, fun"},
                    {"vacation", "holiday, layoff, break"}
                    };
            }
            else
            {
                GetThesaurus();
            }
        }

        public async Task AddSynonymsForWord(Thesaurus thesaurus)
        {
            /* if the key already exists in the thesaurus
               assign the new value to it; else add the key and the value
               in the thesaurus */ 
            if(_thesaurus.ContainsKey(thesaurus.ThesaurusKey)){
                _thesaurus[thesaurus.ThesaurusKey] = _thesaurus[thesaurus.ThesaurusKey].ToString() + ", " + thesaurus.ThesaurusValue;
            }
            else{
                _thesaurus.Add(thesaurus.ThesaurusKey, thesaurus.ThesaurusValue);
            }                            
        }


        public async Task<string> GetSynonymsForWord(string ThesaurusKey)
        {         
            // create a hashtable where we will store synonyms for a key
            Hashtable h = new Hashtable();
            var synonyms = "";

            // assign word as a key and add values of that key found in the thesaurus
            h.Add(ThesaurusKey,_thesaurus[ThesaurusKey].ToString());    

            /* if word we pass as a key exists as a value of some other key
               store those values in the hashtable as well*/
            foreach (string key in _thesaurus.Keys)
            {
                if (_thesaurus[key].ToString().Contains(ThesaurusKey))
                {
                    if(h.ContainsKey(ThesaurusKey)){
                        h[ThesaurusKey] = h[ThesaurusKey] + ", " + _thesaurus[key].ToString() + ", " + key;
                    }                   
                }
            }

            /* for easier handling of the values in angular
               store values in a string synonyms */
            foreach(var syn in h.Values){
                synonyms += syn;
            }

            // return result as a string
            return synonyms;
        }

        // public async Task<List<string>> GetSynonymsForWord(string ThesaurusKey)
        // {         
        //     Stopwatch timer = new Stopwatch();
        //     timer.Start();
        //     List<string> synonymList = new List<string>();
        //     List<string> synonyms = new List<string>();
            
        //     if(_thesaurus[ThesaurusKey].ToString() != null){
        //         synonymList.Add(_thesaurus[ThesaurusKey].ToString());                
        //     }      
        //     Console.WriteLine("Add key values - " + timer.Elapsed.ToString());                  

        //     foreach (string key in _thesaurus.Keys)
        //     {
        //         if (_thesaurus[key].ToString().Contains(ThesaurusKey))
        //         {
        //             synonymList.Add(_thesaurus[key].ToString() + ", " + key);
        //         }
        //     }

        //     foreach(var syn in synonymList){
        //         var s = syn.Replace(", " + ThesaurusKey, "");
        //         //synonyms.Add(s);
        //         //synonyms[0] = synonyms[0] + s;
        //         if(synonyms.Count() < 1){
        //             synonyms.Add(s);
        //         }else{
        //             synonyms[0] = synonyms[0] + ", " + s;
        //         }
        //         //synonyms.Add(s);
        //         //synonyms.Append(s);
        //     }

        //     return synonyms;
        // }

        public async Task<Hashtable> GetThesaurus()
        {
            return _thesaurus;
        }
    }
}