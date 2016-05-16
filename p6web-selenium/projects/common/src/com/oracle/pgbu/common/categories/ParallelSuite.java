/**
 * Reference: https://java.net/projects/parallel-junit/lists/cvs/archive/2009-07/message/9   (trunk / parallel-junit / src / org / kohsuke / junit4 / ParallelSuite.java)
 * Utility class to execute Tests classes in parallel
 */

package com.oracle.pgbu.common.categories;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletionService;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.junit.runner.Runner;
import org.junit.runner.notification.RunNotifier;
import org.junit.runners.Suite;
import org.junit.runners.model.InitializationError;
import org.junit.runners.model.RunnerBuilder;
import org.junit.runners.model.Statement;

/**
 * {@link ParallelSuite} that runs TestClass in parallel.
 * 
 * <p>
 * <b>TestSuite Example</b>:<br/>
 * <code>@RunWith(ParallelSuite.class)</code><br/>
 * <code>@SuiteClasses(
 * {Test1.class, Test2.class,Test3.class, Test4.class, Test5.class})</code><br/>
 * <code>@NThreads(5)</code><br/>
 * <code>public class TestSuiteClass{}</code><br/>
 * 
 * <p>
 * NThreads is number of threads, and is omissible.
 * 
 * @see org.junit.runners.Suite
 * 
 * @author cactusman
 * @author royzumi
 */
public class ParallelSuite extends Suite {
	@Retention(RetentionPolicy.RUNTIME)
	@Target(ElementType.TYPE)
	public @interface NThreads {
		/**
		 * @return Number of Threads.
		 */
		public int value();
	}

	private final int nThreads;

	public ParallelSuite(Class<?> klass, RunnerBuilder builder) throws InitializationError {
		super(klass, builder);
		nThreads = getNThreads(klass);
	}

	private static int getNThreads(Class<?> klass) throws InitializationError {
		NThreads annotation = klass.getAnnotation(NThreads.class);
		if (annotation == null) {
			return defaultThreadSize();
		} else {
			return annotation.value();
		}
	}

	private static final int defaultThreadSize() {
		return 200;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected Statement childrenInvoker(final RunNotifier notifier) {
		return new Statement() {
			@Override
			public void evaluate() {
				runChildren(notifier);
			}
		};
	}

	private void runChildren(final RunNotifier notifier) {
		ExecutorService es = Executors.newFixedThreadPool(nThreads);
		CompletionService<Object> completionService = new ExecutorCompletionService<Object>(es);
		for (final Runner runner : getChildren()) {
			completionService.submit(new Callable<Object>() {
				public Object call() {
					runChild(runner, notifier);
					return null;
				}
			});
		}
		int n = getChildren().size();
		try {
			for (int i = 0; i < n; i++) {
				try {
					completionService.take().get();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} finally {
			es.shutdown();
		}
	}
}
