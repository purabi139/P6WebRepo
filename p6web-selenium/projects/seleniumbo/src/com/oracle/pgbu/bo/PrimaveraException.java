package com.oracle.pgbu.bo;

public class PrimaveraException extends Exception
{

    private static final long serialVersionUID = 1997753363232807009L;

		public PrimaveraException()
		{
		}

		public PrimaveraException(String message)
		{
			super(message);
		}

		public PrimaveraException(Throwable cause)
		{
			super(cause);
		}

		public PrimaveraException(String message, Throwable cause)
		{
			super(message, cause);
		}

		public PrimaveraException(String message, Throwable cause, 
                                           boolean enableSuppression, boolean writableStackTrace)
		{
			super(message, cause, enableSuppression, writableStackTrace);
		}

}