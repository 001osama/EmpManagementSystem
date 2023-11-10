using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EmpManagement.Interface
{
    interface IDatabase
    {
        public DataTable getDataTable(string query, SqlParameter[] parammeters = null);
        public DataSet getDataSet(string query, SqlParameter[] parammeters = null);
    }
}
