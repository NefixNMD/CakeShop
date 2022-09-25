using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CakeShop.BindingModels;
using CakeShop.Models;
using CakeShop.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CakeShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private IRepositoryWrapper _repositoryWrapper;
        private readonly IMapper _mapper;

        public TransactionController(IRepositoryWrapper repositoryWrapper, IMapper mapper)
        {
            _repositoryWrapper = repositoryWrapper;
            _mapper = mapper;
        }

        // POST: api/Review
        [HttpPost]
        public async Task<ActionResult> PostTransaction(TransactionBindingModel transactionBindingModel)
        {
            var transaction = _mapper.Map<Transaction>(transactionBindingModel);
            _repositoryWrapper.TransactionRepository.Create(transaction);
            _repositoryWrapper.Save();

            return Ok();
        }

    }
}