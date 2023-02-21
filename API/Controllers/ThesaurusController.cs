using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ThesaurusController : BaseAPIController
    {
        private readonly IThesaurusRepository _thesaurusRepository;

        public ThesaurusController(IThesaurusRepository thesaurusRepository){            
            _thesaurusRepository = thesaurusRepository;        
        }

        [HttpPost("addsynonymsforword")]
        public async Task<IActionResult> AddSynonymsForWord([FromBody]Thesaurus thesaurus){
            try{
                await _thesaurusRepository.AddSynonymsForWord(thesaurus);
                return Ok();
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }          
        }

        [HttpGet("getsynonymsforword/{word}")]
        public async Task<IActionResult> GetSynonymsForWord(string word){
            try{                
                return Ok(await _thesaurusRepository.GetSynonymsForWord(word));
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }              
        }

        [HttpGet("getthesaurus")]
        public async Task<IActionResult> GetThesaurus(){
            try{
                return Ok(await _thesaurusRepository.GetThesaurus());
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }  
        }
    }
}