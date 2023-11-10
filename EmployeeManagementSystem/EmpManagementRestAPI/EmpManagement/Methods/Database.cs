using EmpManagement.Interface;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace EmpManagement.Methods
{
    public class Database : IDatabase
    {
        private readonly string _sqlDataSource;

        public Database(string sqlDataSource)
        {
            _sqlDataSource = sqlDataSource;
        }

        public DataTable getDataTable(string query, SqlParameter[] parammeters = null)
        {
            DataTable dt = new DataTable();
            SqlDataReader sqlReader;
            using (SqlConnection sqlConn = new SqlConnection(_sqlDataSource))
            {
                sqlConn.Open();
                using (SqlCommand sqlComm = new SqlCommand(query, sqlConn))
                {
                    sqlComm.CommandType = CommandType.StoredProcedure;
                    sqlComm.Parameters.Clear();
                    if (parammeters != null)
                    {
                        foreach (var paramter in parammeters)
                        {
                            sqlComm.Parameters.Add(paramter);
                        }
                    }
                    sqlReader = sqlComm.ExecuteReader();
                    dt.Load(sqlReader);
                    sqlReader.Close();
                    sqlConn.Close();
                }
            }
            return dt;
        }

        public DataSet getDataSet(string query, SqlParameter[] parammeters = null)
        {
            DataSet ds = new DataSet();
            SqlDataReader sqlReader;
            using (SqlConnection sqlConn = new SqlConnection(_sqlDataSource))
            {
                sqlConn.Open();
                using (SqlCommand sqlComm = new SqlCommand(query, sqlConn))
                {
                    sqlComm.CommandType = CommandType.StoredProcedure;
                    sqlComm.Parameters.Clear();
                    if (parammeters != null)
                    {
                        foreach (var paramter in parammeters)
                        {
                            sqlComm.Parameters.Add(paramter);
                        }
                    }
                    //sqlReader = sqlComm.ExecuteReader();
                    //ds.Load(sqlReader);
                    //sqlReader.Close();
                    SqlDataAdapter adapter = new SqlDataAdapter(sqlComm);
                    adapter.Fill(ds);
                    sqlConn.Close();
                }
            }
            return ds;
        }
    }
}
